use anchor_lang::prelude::*;
use crate::state::*;

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub user_wallet: Signer<'info>,
    #[account(mut)]
    /// CHECK: stake account (vault)
    pub stake_account: AccountInfo<'info>,
    #[account(mut)]
    pub pool: Account<'info, StakingPool>,
    #[account(mut)]
    pub user: Account<'info, UserStake>,
    pub system_program: Program<'info, System>,
}