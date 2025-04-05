use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::state::*;

#[derive(Accounts)]
pub struct Undelegate<'info> {
    #[account(mut)]
    pub pool: Account<'info, StakingPool>,
    #[account(mut)]
    /// CHECK: stake account to deactivate
    pub stake_account: AccountInfo<'info>,
    #[account(address = solana_program::sysvar::clock::ID)]
    pub clock: AccountInfo<'info>,
}