use anchor_lang::prelude::*;
use anchor_lang::solana_program::{
    program::invoke_signed,
    stake::{ instruction as stake_instruction, state::Authorized, state::Lockup},
};

use crate::accounts_ix::InitiatePool;

pub fn initiate_pool(ctx: Context<InitiatePool>, validator: Pubkey) -> Result<()> {
    msg!("Stake config: {}", ctx.accounts.stake_config.key());

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

    // Initialize stake account
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


    msg!("Validator from account: {}", ctx.accounts.validator_vote.key());
    msg!("Stake account: {}", stake_key);
    msg!("Pool account: {}", pool_key);
    msg!("Stake config: {}", ctx.accounts.stake_config.key());
    msg!("Stake history: {}", ctx.accounts.stake_history.key());
    msg!("Clock: {}", ctx.accounts.clock.key());
    msg!("Stake program: {}", ctx.accounts.stake_program.key());

   /*  // After initializing the pool but before delegating
    let pool_data = ctx.accounts.pool.try_borrow_data()?;
    msg!("Pool data initialized with size: {}", pool_data.len());

    // Delegate to validator
    let delegate_ix = stake_instruction::delegate_stake(&stake_key, &pool_key, &ctx.accounts.validator_vote.key());    invoke_signed(
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
