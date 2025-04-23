use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, stake};
use crate::accounts_ix::Undelegate;


pub fn undelegate(ctx: Context<Undelegate>) -> Result<()> {
    let pool = &ctx.accounts.pool;
    let ix = stake::instruction::deactivate_stake(
        &ctx.accounts.stake_account.key(),
        &pool.key(),
    );
    invoke(
        &ix,
        &[
            ctx.accounts.stake_account.clone(),
            ctx.accounts.clock.clone(),
            ctx.accounts.pool.to_account_info(),
        ],
    )?;
    Ok(())
}