use anchor_lang::prelude::*;
use anchor_lang::solana_program::{program::invoke, stake};
use crate::accounts::Undelegate;

pub fn undelegate(ctx: Context<Undelegate>) -> Result<()> {
    let pool = &mut ctx.accounts.pool;
    let deactivate_ix = stake::instruction::deactivate_stake(
        &ctx.accounts.stake_account.key(),
        &pool.key(),
    );
    invoke(
        &deactivate_ix,
        &[
            ctx.accounts.stake_account.clone(),
            ctx.accounts.clock.to_account_info(),
        ],
    )?;
    Ok(())
}