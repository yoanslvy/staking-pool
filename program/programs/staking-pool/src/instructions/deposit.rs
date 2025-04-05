use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, system_instruction};
use crate::accounts::Deposit;

pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
    let user = &mut ctx.accounts.user;
    let pool = &mut ctx.accounts.pool;

    invoke(
        &system_instruction::transfer(
            ctx.accounts.user_wallet.key,
            ctx.accounts.stake_account.key,
            amount,
        ),
        &[
            ctx.accounts.user_wallet.to_account_info(),
            ctx.accounts.stake_account.clone(),
            ctx.accounts.system_program.to_account_info(),
        ],
    )?;

    let shares = if pool.total_staked == 0 || pool.total_shares == 0 {
        amount
    } else {
        amount * pool.total_shares / pool.total_staked
    };

    pool.total_staked += amount;
    pool.total_shares += shares;

    user.amount_staked += amount;
    user.shares += shares;

    Ok(())
}