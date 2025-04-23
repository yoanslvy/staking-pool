use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    stake::{program::ID as STAKE_PROGRAM_ID, config::ID as STAKE_CONFIG_ID},
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

    /// CHECK: Not deserialized, just used for pubkey
    pub validator_vote: UncheckedAccount<'info>,

    /// Sysvars and constants
    #[account(address = CLOCK_ID)]
    pub clock: Sysvar<'info, Clock>,

    /// CHECK: stake history ID
    #[account(address = STAKE_HISTORY_ID)]
    pub stake_history: Sysvar<'info, StakeHistory>,

    /// CHECK: StakeConfig account
    #[account(address = STAKE_CONFIG_ID)]
    pub stake_config: UncheckedAccount<'info>,

    /// CHECK: rent ID
    #[account(address = RENT_ID)]
    pub rent: Sysvar<'info, Rent>,

    /// CHECK: Required for invoking stake CPI
    #[account(address = STAKE_PROGRAM_ID)]
    pub stake_program: UncheckedAccount<'info>,

    /// Transaction payer
    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,

}
