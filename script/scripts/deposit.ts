import dotenv from "dotenv";
import {
    AnchorProvider,
    Program,
    Wallet,
    web3,
} from "@coral-xyz/anchor";
import {
    PublicKey,
    SystemProgram,
    Keypair,
    Connection,
} from "@solana/web3.js";
import fs from "fs";
import stakingPoolIdl from "../idl/staking_pool.json";
import BN from "bn.js";


dotenv.config();

const path = process.env.KEY_PATH;
const DEPOSIT_AMOUNT_SOL = 0.1;

const exec = async (): Promise<void> => {
    const payer = Keypair.fromSecretKey(
        new Uint8Array(
            JSON.parse(fs.readFileSync(`${path}.config/solana/devnet.json`, "utf-8"))
        )
    );

    console.log("Payer:", payer.publicKey.toBase58());

    const solanaClient = new Connection("https://api.devnet.solana.com", "confirmed");
    const provider = new AnchorProvider(solanaClient, new Wallet(payer), AnchorProvider.defaultOptions());
    const program = new Program(stakingPoolIdl as any, provider) as any;

    // Derive the pool PDA (same seeds used in program)
    const [poolPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("pool"), payer.publicKey.toBuffer()],
        program.programId
    );

    console.log("Pool PDA:", poolPda.toBase58());

    // Derive user PDA (optional: if your program uses user-specific state)
    const [userPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user"), payer.publicKey.toBuffer(), poolPda.toBuffer()],
        program.programId
    );

    console.log("User PDA:", userPda.toBase58());

    const stakeAccount = new PublicKey("29MRNwc7LYWH6Bm457ch8HcLmHVGuzGGA6KNSar2snP2");

    // Amount in lamports
    const amount = web3.LAMPORTS_PER_SOL * DEPOSIT_AMOUNT_SOL;

    // Log what’s happening
    console.log("Depositing", amount / web3.LAMPORTS_PER_SOL, "SOL to stake account:", stakeAccount.toBase58());

    await program.methods
        .depositStake(new BN(amount))
        .accounts({
            userWallet: payer.publicKey,
            stakeAccount,
            pool: poolPda,
            user: userPda,
            systemProgram: SystemProgram.programId,
        })
        .signers([payer])
        .rpc();

    console.log("✅ Deposit successful!");
};

exec().catch((err) => {
    console.error("❌ Deposit failed:");
    console.error(err);
});
