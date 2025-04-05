use anchor_lang::prelude::*;
use crate::accounts::ViewUserRewards;

pub fn view_user_rewards(ctx: Context<ViewUserRewards>) -> Result<u64> {
    let user = &ctx.accounts.user;
    let pool = &ctx.accounts.pool;
    Ok(user.rewards)
}