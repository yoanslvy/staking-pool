use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, stake};
use crate::accounts_ix::FinalizeWithdraw;
use crate::error::*;

pub fn finalize_withdraw(ctx: Context<FinalizeWithdraw>) -> Result<()> {
    let clock = Clock::get()?;
    let user = &mut ctx.accounts.user;
    let pool = &mut ctx.accounts.pool;

    let requested_at = user.withdraw_requested_at.ok_or(CustomError::WithdrawNotStarted)?;
    let now = clock.unix_timestamp;
    let elapsed = now - requested_at as i64;
    require!(elapsed >= 0, CustomError::UnstakeDelay); 


    let amount = user.shares * pool.total_staked / pool.total_shares;

    pool.total_staked -= amount;
    pool.total_shares -= user.shares;

    user.amount_staked = 0;
    user.shares = 0;
    user.withdraw_requested_at = None;

    let ix = stake::instruction::withdraw(
        &ctx.accounts.stake_account.key(),
        &pool.key(),
        &ctx.accounts.user_wallet.key(),
        amount,
        None,
    );
    invoke(
    &ix,
    &[
        ctx.accounts.stake_account.clone(),
        ctx.accounts.user_wallet.to_account_info(),
        ctx.accounts.pool.to_account_info(),
        ctx.accounts.clock.to_account_info(),          
        ctx.accounts.stake_history.to_account_info(),   
    ],
)?;

    Ok(())
}