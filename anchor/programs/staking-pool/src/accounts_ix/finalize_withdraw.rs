use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::clock::ID as CLOCK_ID;

use crate::state::*;

#[derive(Accounts)]
pub struct FinalizeWithdraw<'info> {
    #[account(mut)]
    pub user_wallet: Signer<'info>,
    #[account(mut)]
    pub pool: Account<'info, StakingPool>,
    #[account(mut)]
    pub user: Account<'info, UserStake>,
    #[account(mut)]
    /// CHECK: Stake account holding staked SOL
    pub stake_account: AccountInfo<'info>,
    /// CHECK: Sysvars and constants
    #[account(address = CLOCK_ID)]
    pub clock: AccountInfo<'info>,
}