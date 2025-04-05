use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::state::*;

#[derive(Accounts)]
pub struct InitiatePool<'info>> {
    #[account(init, payer = payer, space = 8 + 32 + 1 + 8 + 8, seeds = [b"pool"], bump)]
    pub pool: Account<'info, StakingPool>,

    /// CHECK: Initialized as a Stake program account
    #[account(mut)]
    pub stake_account: AccountInfo<'info>,

    /// CHECK: vote account of the validator
    pub validator_vote: AccountInfo<'info>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub stake_program: Program<'info, Stake>,

    /// CHECK: for stake::instruction::initialize
    pub rent: AccountInfo<'info>,

    /// CHECK: for stake::instruction::delegate_stake
    pub clock: AccountInfo<'info>,
    /// CHECK: for stake::instruction::delegate_stake
    pub stake_history: AccountInfo<'info>,
    /// CHECK: for stake::instruction::delegate_stake
    pub stake_config: AccountInfo<'info>,
}
