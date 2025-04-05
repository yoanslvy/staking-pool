use anchor_lang::prelude::*;
use crate::accounts_ix::ViewUserRewards;

pub fn view_user_rewards(ctx: Context<ViewUserRewards>) -> Result<u64> {
    let user = &ctx.accounts.user;
    Ok(user.shares)
}