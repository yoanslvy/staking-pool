use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, stake};
use crate::accounts_ix::InitiatePool; 


pub fn initiate_pool(ctx: Context<InitiatePool>, validator: Pubkey) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    pool.validator = validator;
    pool.bump = ctx.bumps.pool;
    pool.total_staked = 0;
    pool.total_shares = 0;

    let authorized = stake::state::Authorized {
        staker: pool.key(),
        withdrawer: pool.key(),
    };

    let lockup = stake::state::Lockup::default();

    let initialize_ix = stake::instruction::initialize(
        &ctx.accounts.stake_account.key(),
        &authorized,
        &lockup,
    );
    invoke(
        &initialize_ix,
        &[
            ctx.accounts.stake_account.clone(),
            ctx.accounts.rent.clone(),
        ],
    )?;

    let delegate_ix = stake::instruction::delegate_stake(
        &ctx.accounts.stake_account.key(),
        &pool.key(),
        &ctx.accounts.validator_vote.key(),
    );
    invoke(
        &delegate_ix,
        &[
            ctx.accounts.stake_account.clone(),
            ctx.accounts.validator_vote.clone(),
            ctx.accounts.clock.clone(),
            ctx.accounts.stake_history.clone(),
            ctx.accounts.stake_config.clone(),
        ],
    )?;

    Ok(())
}
