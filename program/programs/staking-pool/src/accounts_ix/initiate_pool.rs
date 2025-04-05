use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    stake::{config::ID as STAKE_CONFIG_ID},
    sysvar::{clock::ID as CLOCK_ID, rent::ID as RENT_ID, stake_history::ID as STAKE_HISTORY_ID},
};

use crate::state::*;

#[derive(Accounts)]
pub struct InitiatePool<'info> {
    /// Unique pool PDA derived from seed ["pool", payer]
    #[account(
        init,
        seeds = [b"pool", payer.key().as_ref()],
        bump,
        payer = payer,
        space = 8 + StakingPool::SIZE,
    )]
    pub pool: Account<'info, StakingPool>,

    /// CHECK: previously created stake account
    #[account(mut)]
    pub stake_account: UncheckedAccount<'info>,

    /// Validator vote account passed in via argument
    /// CHECK: Not deserialized, just used for pubkey
    pub validator_vote: UncheckedAccount<'info>,

    /// Sysvars and constants
    #[account(address = CLOCK_ID)]
    pub clock: Sysvar<'info, Clock>,

    /// CHECK: stake history ID
    #[account(address = STAKE_HISTORY_ID)]
    pub stake_history: Sysvar<'info, StakeHistory>,

    /// CHECK: Hardcoded config account for stake program
    #[account(address = STAKE_CONFIG_ID)]
    pub stake_config: UncheckedAccount<'info>,

    /// CHECK: rent ID
    #[account(address = RENT_ID)]
    pub rent: Sysvar<'info, Rent>,

    /// Transaction payer
    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,

}
