use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug, PartialEq, Eq)]
pub struct PoolStats {
    pub total_staked: u64,
    pub total_shares: u64,
}
