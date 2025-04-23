import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { assert } from "chai";
import { StakingPool } from "../target/types/staking_pool";

describe("staking_pool: view_pool_stats", () => {
    console.log("YOOOOO")
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.StakingPool as Program<StakingPool>;
    const payer = provider.wallet;

    let poolPda: PublicKey;

    before(async () => {
        [poolPda] = await PublicKey.findProgramAddress(
            [Buffer.from("pool"), payer.publicKey.toBuffer()],
            program.programId
        );

    });

    it("returns the correct pool stats", async () => {
        const stats = await program.methods
            .viewTotalPoolStats()
            .accounts({
                pool: poolPda,
            })
            .view();


        assert.isDefined(stats.totalStaked);
        assert.isDefined(stats.totalShares);
        assert.strictEqual(stats.totalStaked.toNumber(), 0);
        assert.strictEqual(stats.totalShares.toNumber(), 0);
    });
});
