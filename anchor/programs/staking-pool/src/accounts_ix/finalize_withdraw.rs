use anchor_lang::prelude::*;
use anchor_lang::solana_program::sysvar::stake_history::ID as STAKE_HISTORY_ID;
use anchor_lang::solana_program::sysvar::clock::ID as CLOCK_ID;

use crate::state::*; 

#[derive(Accounts)]
pub struct FinalizeWithdraw<'info> {
    #[account(mut)]
    pub user_wallet: Signer<'info>,

    #[account(mut)]
    /// CHECK: Stake account holding delegated SOL
    pub stake_account: AccountInfo<'info>,

    #[account(
        mut,
        close = user_wallet
    )]
    pub user: Account<'info, UserStake>,

    #[account(mut)]
    pub pool: Account<'info, StakingPool>,

    #[account(address = CLOCK_ID)]
    pub clock: Sysvar<'info, Clock>,

    /// CHECK: Required by stake program CPI
    #[account(address = STAKE_HISTORY_ID)]
    pub stake_history: AccountInfo<'info>,
}
