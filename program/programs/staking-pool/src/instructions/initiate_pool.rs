use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    program::invoke_signed,
    stake::{ instruction as stake_instruction, state::Authorized, state::Lockup},
};

use crate::accounts_ix::InitiatePool;

pub fn initiate_pool(ctx: Context<InitiatePool>, validator: Pubkey) -> Result<()> {

    let pool = &mut ctx.accounts.pool;
    pool.validator = validator;
    pool.bump = ctx.bumps.pool;
    pool.total_staked = 0;
    pool.total_shares = 0;

    let pool_key = pool.key();
    let stake_key = ctx.accounts.stake_account.key();

    let authorized = Authorized {
        staker: pool_key,
        withdrawer: pool_key,
    };

    let lockup = Lockup::default();

    let initialize_ix = stake_instruction::initialize(&stake_key, &authorized, &lockup);
    invoke_signed(
        &initialize_ix,
        &[
            ctx.accounts.stake_account.to_account_info(),
            ctx.accounts.rent.to_account_info(),
            ctx.accounts.stake_program.to_account_info(),
        ],
        &[&[b"pool", ctx.accounts.payer.key.as_ref(), &[pool.bump]]],
    )?;

/*     let delegate_ix = stake_instruction::delegate_stake(&stake_key, &pool_key, &ctx.accounts.validator_vote.key());    invoke_signed(
        &delegate_ix,
        &[
            ctx.accounts.stake_account.to_account_info(),
            ctx.accounts.validator_vote.to_account_info(),
            ctx.accounts.clock.to_account_info(),
            ctx.accounts.stake_history.to_account_info(),
            ctx.accounts.stake_config.to_account_info(),
            ctx.accounts.stake_program.to_account_info(),

        ],
        &[&[b"pool", ctx.accounts.payer.key.as_ref(), &[pool.bump]]],
    )?; */

    Ok(())
}
