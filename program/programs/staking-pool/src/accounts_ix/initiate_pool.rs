use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    stake::{config::ID as STAKE_CONFIG_ID, program::ID as STAKE_PROGRAM_ID},
    sysvar::{clock::ID as CLOCK_ID, rent::ID as RENT_ID, stake_history::ID as STAKE_HISTORY_ID},
};

use crate::state::*;

#[derive(Accounts)]
pub struct InitiatePool<'info> {
    #[account(init, payer = payer, space = 8 + 32 + 1 + 8 + 8, seeds = [b"pool"], bump)]
    pub pool: Account<'info, StakingPool>,

    /// CHECK: Initialized as a Stake program account
    #[account(mut)]
    pub stake_account: AccountInfo<'info>,

    /// CHECK: vote account of the validator
    #[account()]
    pub validator_vote: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
    /// CHECK: This is the native Solana stake program, verified via address constraint
    #[account(address = STAKE_PROGRAM_ID)]
    pub stake_program: AccountInfo<'info>,

    /// CHECK: This is the native Solana stake program, verified via address constraint
    #[account(address = RENT_ID)]
    pub rent: AccountInfo<'info>,

    /// CHECK: This is the native Solana stake program, verified via address constraint
    #[account(address = CLOCK_ID)]
    pub clock: AccountInfo<'info>,
    /// CHECK: This is the native Solana stake program, verified via address constraint
    #[account(address = STAKE_HISTORY_ID)]
    pub stake_history: AccountInfo<'info>,
    /// CHECK: This is the native Solana stake program, verified via address constraint
    #[account(address = STAKE_CONFIG_ID)]
    pub stake_config: AccountInfo<'info>,
}
