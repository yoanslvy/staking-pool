import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { assert } from "chai";
import { StakingPool } from "../target/types/staking_pool";

describe("staking_pool", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const connection = provider.connection;

    const program = anchor.workspace.StakingPool as Program<StakingPool>;
    const payer = provider.wallet;


    it("initializes the staking pool", async () => {
        await provider.connection.requestAirdrop(payer.publicKey, 2 * anchor.web3.LAMPORTS_PER_SOL);

        const [poolPda, bump] = await PublicKey.findProgramAddress(
            [Buffer.from("pool"), payer.publicKey.toBuffer()],
            program.programId
        );

        const stakeAccount = Keypair.generate();
        const lamports = await connection.getMinimumBalanceForRentExemption(200);

        const tx = new anchor.web3.Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: stakeAccount.publicKey,
                lamports,
                space: 200,
                programId: new PublicKey("Stake11111111111111111111111111111111111111"),
            })
        );

        await provider.sendAndConfirm(tx, [stakeAccount]);

        await program.methods
            .initiatePoolConfig(new PublicKey("29MRNwc7LYWH6Bm457ch8HcLmHVGuzGGA6KNSar2snP2"))
            .accounts({
                pool: poolPda,
                stakeAccount: stakeAccount.publicKey,
                validatorVote: new PublicKey("29MRNwc7LYWH6Bm457ch8HcLmHVGuzGGA6KNSar2snP2"),
                clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                stakeHistory: anchor.web3.SYSVAR_STAKE_HISTORY_PUBKEY,
                stakeConfig: new PublicKey("StakeConfig11111111111111111111111111111111"),
                stakeProgram: new PublicKey("Stake11111111111111111111111111111111111111"),
                systemProgram: SystemProgram.programId,
                payer: payer.publicKey,
            })
            .rpc();

        const poolAccount = await program.account.stakingPool.fetch(poolPda);
        assert.strictEqual(poolAccount.totalStaked.toNumber(), 0);
        assert.ok(poolAccount.validator.toBase58() !== "");
    });
});
