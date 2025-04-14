import dotenv from "dotenv";
import { AnchorProvider, Program, Wallet, web3 } from "@coral-xyz/anchor";
import {
  PublicKey,
  SystemProgram,
  Keypair,
  Connection,
} from "@solana/web3.js";
import fs from "fs";
import stakingPoolIdl from "../idl/staking_pool.json";

dotenv.config();

// Constants
const STAKE_PROGRAM_ID = new PublicKey("Stake11111111111111111111111111111111111111");
const STAKE_CONFIG_ID = new PublicKey("StakeConfig11111111111111111111111111111111");
const SYSVAR_CLOCK = web3.SYSVAR_CLOCK_PUBKEY;
const SYSVAR_RENT = web3.SYSVAR_RENT_PUBKEY;
const SYSVAR_STAKE_HISTORY = web3.SYSVAR_STAKE_HISTORY_PUBKEY;


const path = process.env.KEY_PATH;
const validatorId = "29MRNwc7LYWH6Bm457ch8HcLmHVGuzGGA6KNSar2snP2";

const exec = async (): Promise<void> => {
  // 🔐 Load wallet
  const payer = Keypair.fromSecretKey(
    new Uint8Array(
      JSON.parse(fs.readFileSync(`${path}.config/solana/devnet.json`, "utf-8"))
    )
  );

  const solanaClient = new Connection("https://api.devnet.solana.com", "confirmed");
  const provider = new AnchorProvider(solanaClient, new Wallet(payer), AnchorProvider.defaultOptions());
  const program = new Program(stakingPoolIdl as any, provider) as any;
  const validatorVote = new PublicKey(validatorId);

  console.log("Program ID:", program.programId.toBase58());

  // 🆔 Derive pool PDA
  const [poolPda, bump] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("pool"), payer.publicKey.toBuffer()],
    program.programId
  );
  console.log("Pool PDA:", poolPda.toBase58());

  // 🏗️ Create uninitialized stake account
  const stakeAccount = Keypair.generate();
  const STAKE_ACCOUNT_SPACE = 200;
  const lamports = await solanaClient.getMinimumBalanceForRentExemption(STAKE_ACCOUNT_SPACE);

  const createStakeIx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: stakeAccount.publicKey,
    lamports,
    space: STAKE_ACCOUNT_SPACE,
    programId: STAKE_PROGRAM_ID,
  });

  const tx1 = new web3.Transaction().add(createStakeIx);
  const tx1Hash = await provider.sendAndConfirm(tx1, [payer, stakeAccount]);
  console.log("✅ Stake account created:", tx1Hash);

  // Confirm it's created
  const stakeInfo = await solanaClient.getAccountInfo(stakeAccount.publicKey);
  console.log("Stake Account Owner:", stakeInfo?.owner.toBase58());
  console.log("Stake Account Data Length:", stakeInfo?.data.length);

  // Confirm stake config exists
  const acc = await solanaClient.getAccountInfo(STAKE_CONFIG_ID);
  console.log("✅ StakeConfig account exists:", acc !== null);

  console.log("Validator vote account:", validatorVote.toBase58());


  // 🧠 Call the instruction using `.rpc()`
  await program.methods
    .initiatePoolConfig(validatorVote)
    .accounts({
      pool: poolPda,
      stakeAccount: stakeAccount.publicKey,
      validatorVote,
      payer: payer.publicKey,
      systemProgram: SystemProgram.programId,
      rent: SYSVAR_RENT,
      clock: SYSVAR_CLOCK,
      stakeHistory: SYSVAR_STAKE_HISTORY,
      stakeConfig: STAKE_CONFIG_ID,
      stakeProgram: STAKE_PROGRAM_ID,

    })
    .signers([payer])
    .rpc();

  console.log("✅ Pool config initialized via `.rpc()`");
};

exec().catch((error) => {
  console.error("Fatal error:");
  console.error(error);
});
