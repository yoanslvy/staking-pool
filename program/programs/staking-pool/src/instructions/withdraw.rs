use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::accounts_ix::Withdraw;

pub fn withdraw(ctx: Context<Withdraw>) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let pool = &mut ctx.accounts.pool;

    let amount = user.shares * pool.total_staked / pool.total_shares;

    pool.total_staked -= amount;
    pool.total_shares -= user.shares;

    user.amount_staked = 0;
    user.shares = 0;

    invoke(
        &system_instruction::transfer(
            ctx.accounts.stake_account.key,
            ctx.accounts.user_wallet.key,
            amount,
        ),
        &[
            ctx.accounts.stake_account.clone(),
            ctx.accounts.user_wallet.to_account_info(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    Ok(())
}