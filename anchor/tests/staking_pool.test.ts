import * as anchor from "@coral-xyz/anchor";
import {
    PublicKey,
    SystemProgram,
    Keypair,
} from "@solana/web3.js";

describe("staking_pool: localnet tests", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.StakingPool as any;
    const connection = provider.connection;
    const payer = provider.wallet;

    const STAKE_PROGRAM_ID = new PublicKey("Stake11111111111111111111111111111111111111");
    const STAKE_CONFIG_ID = new PublicKey("StakeConfig11111111111111111111111111111111");
    const SYSVAR_CLOCK = anchor.web3.SYSVAR_CLOCK_PUBKEY;
    const SYSVAR_RENT = anchor.web3.SYSVAR_RENT_PUBKEY;
    const SYSVAR_STAKE_HISTORY = anchor.web3.SYSVAR_STAKE_HISTORY_PUBKEY;
    const validatorVote = new PublicKey("29MRNwc7LYWH6Bm457ch8HcLmHVGuzGGA6KNSar2snP2");

    let poolPda: PublicKey;
    let stakeAccount: Keypair;

    beforeAll(async () => {

        [poolPda] = await PublicKey.findProgramAddress(
            [Buffer.from("pool"), payer.publicKey.toBuffer()],
            program.programId
        );


        stakeAccount = Keypair.generate();
        const lamports = await connection.getMinimumBalanceForRentExemption(200);
        const createIx = SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: stakeAccount.publicKey,
            lamports,
            space: 200,
            programId: STAKE_PROGRAM_ID,
        });

        const tx = new anchor.web3.Transaction().add(createIx);
        await provider.sendAndConfirm(tx, [stakeAccount]);

        await program.methods
            .initiatePoolConfig(validatorVote)
            .accounts({
                pool: poolPda,
                stakeAccount: stakeAccount.publicKey,
                validatorVote,
                clock: SYSVAR_CLOCK,
                stakeHistory: SYSVAR_STAKE_HISTORY,
                stakeConfig: STAKE_CONFIG_ID,
                rent: SYSVAR_RENT,
                stakeProgram: STAKE_PROGRAM_ID,
                payer: payer.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc();
    });

    test("initializes the staking pool", async () => {
        const poolAccount = await program.account.stakingPool.fetch(poolPda);
        expect(poolAccount.validator.equals(validatorVote)).toBe(true);
        expect(poolAccount.totalStaked.toNumber()).toBe(0);
        expect(poolAccount.totalShares.toNumber()).toBe(0);
    });

    test("returns correct staking pool stats", async () => {
        const stats = await program.methods
            .viewTotalPoolStats()
            .accounts({
                pool: poolPda,
            })
            .view();

        expect(stats.totalStaked.toNumber()).toBe(0);
        expect(stats.totalShares.toNumber()).toBe(0);
    });




    /*   test("user can deposit into the pool after initializing user", async () => {
          const depositAmount = new anchor.BN(1_000_000); // 0.001 SOL
  
          // Step 1: Create a new user wallet
          const userWallet = Keypair.generate();
          const userWalletPubkey = userWallet.publicKey;
  
          const sig = await connection.requestAirdrop(userWalletPubkey, 2 * anchor.web3.LAMPORTS_PER_SOL);
          const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
          await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight });
  
          // Step 2: Derive UserStake PDA
          const [userStakePda] = await PublicKey.findProgramAddress(
              [Buffer.from("user"), userWalletPubkey.toBuffer()],
              program.programId
          );
  
          // Step 3: Initialize user
          await program.methods
              .initializeUserAccount()
              .accounts({
                  user: userStakePda,
                  payer: userWalletPubkey,
                  systemProgram: SystemProgram.programId,
              })
              .signers([userWallet])
              .rpc();
  
          // Step 4: Create stakeAccount
          const stakeAccount = Keypair.generate();
          const stakeLamports = await connection.getMinimumBalanceForRentExemption(200);
          const createStakeIx = SystemProgram.createAccount({
              fromPubkey: userWalletPubkey,
              newAccountPubkey: stakeAccount.publicKey,
              lamports: stakeLamports,
              space: 200,
              programId: STAKE_PROGRAM_ID,
          });
  
          const createStakeTx = new anchor.web3.Transaction().add(createStakeIx);
          await provider.sendAndConfirm(createStakeTx, [userWallet, stakeAccount]);
  
          // Step 5: Deposit
          await program.methods
              .depositStake(depositAmount)
              .accounts({
                  userWallet: userWalletPubkey,
                  stakeAccount: stakeAccount.publicKey,
                  user: userStakePda,
                  pool: poolPda,
                  systemProgram: SystemProgram.programId,
              })
              .signers([userWallet])
              .rpc();
  
          // Step 6: Assertions
          const userAccount = await program.account.userStake.fetch(userStakePda);
          const poolAccount = await program.account.stakingPool.fetch(poolPda);
  
          expect(userAccount.amountStaked.toNumber()).toBe(depositAmount.toNumber());
          expect(userAccount.shares.toNumber()).toBe(depositAmount.toNumber());
          expect(poolAccount.totalStaked.toNumber()).toBe(depositAmount.toNumber());
          expect(poolAccount.totalShares.toNumber()).toBe(depositAmount.toNumber());
      }) */



    /*  test("user can start a withdrawal and sets timestamp", async () => {
         const userWallet = Keypair.generate();
         const userWalletPubkey = userWallet.publicKey;
 
         // Airdrop SOL
         const sig = await connection.requestAirdrop(userWalletPubkey, 2 * anchor.web3.LAMPORTS_PER_SOL);
         const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
         await connection.confirmTransaction({ signature: sig, blockhash, lastValidBlockHeight });
 
         // Derive UserStake PDA
         const [userStakePda] = await PublicKey.findProgramAddress(
             [Buffer.from("user"), userWalletPubkey.toBuffer()],
             program.programId
         );
 
         // Call initializeUserAccount
         await program.methods
             .initializeUserAccount()
             .accounts({
                 user: userStakePda,
                 payer: userWalletPubkey,
                 systemProgram: SystemProgram.programId,
             })
             .signers([userWallet])
             .rpc();
 
         // Ensure it’s null before
         let userAccount = await program.account.userStake.fetch(userStakePda);
         expect(userAccount.withdrawRequestedAt).toBeNull();
 
         // Call startWithdrawStake
         await program.methods
             .startWithdrawStake()
             .accounts({
                 user: userStakePda,
                 clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
             })
             .rpc();
 
         // Check it’s set after
         userAccount = await program.account.userStake.fetch(userStakePda);
         expect(userAccount.withdrawRequestedAt).not.toBeNull();
 
         const now = Math.floor(Date.now() / 1000);
         const withdrawTime = userAccount.withdrawRequestedAt.toNumber();
 
         expect(Math.abs(withdrawTime - now)).toBeLessThan(10); // within 10 seconds
     }); */



});
