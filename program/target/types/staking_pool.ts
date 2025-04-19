/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/staking_pool.json`.
 */
export type StakingPool = {
  "address": "6BgSHXAjvG37ZrugqxSgZ5nDJ9mAor5c3h3Vqb6E3p2h",
  "metadata": {
    "name": "stakingPool",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "depositStake",
      "discriminator": [
        160,
        167,
        9,
        220,
        74,
        243,
        228,
        43
      ],
      "accounts": [
        {
          "name": "userWallet",
          "writable": true,
          "signer": true
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "finalizeWithdrawStake",
      "discriminator": [
        105,
        43,
        65,
        138,
        232,
        231,
        206,
        45
      ],
      "accounts": [
        {
          "name": "userWallet",
          "writable": true,
          "signer": true
        },
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initiatePoolConfig",
      "discriminator": [
        205,
        67,
        152,
        159,
        162,
        221,
        237,
        151
      ],
      "accounts": [
        {
          "name": "pool",
          "docs": [
            "Unique pool PDA derived from seed [\"pool\", payer]"
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  111,
                  111,
                  108
                ]
              },
              {
                "kind": "account",
                "path": "payer"
              }
            ]
          }
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "validatorVote"
        },
        {
          "name": "clock",
          "docs": [
            "Sysvars and constants"
          ],
          "address": "SysvarC1ock11111111111111111111111111111111"
        },
        {
          "name": "stakeHistory",
          "address": "SysvarStakeHistory1111111111111111111111111"
        },
        {
          "name": "stakeConfig",
          "address": "StakeConfig11111111111111111111111111111111"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        },
        {
          "name": "stakeProgram",
          "address": "Stake11111111111111111111111111111111111111"
        },
        {
          "name": "payer",
          "docs": [
            "Transaction payer"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "validator",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "startWithdrawStake",
      "discriminator": [
        227,
        138,
        126,
        135,
        132,
        142,
        42,
        214
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "undelegatePoolStake",
      "discriminator": [
        109,
        111,
        70,
        73,
        252,
        173,
        108,
        34
      ],
      "accounts": [
        {
          "name": "pool",
          "writable": true
        },
        {
          "name": "stakeAccount",
          "writable": true
        },
        {
          "name": "clock",
          "address": "SysvarC1ock11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "viewCurrentUserRewards",
      "discriminator": [
        176,
        138,
        49,
        106,
        100,
        122,
        223,
        91
      ],
      "accounts": [
        {
          "name": "user"
        },
        {
          "name": "pool"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "stakingStats"
        }
      }
    },
    {
      "name": "viewTotalPoolStats",
      "discriminator": [
        99,
        245,
        166,
        179,
        152,
        84,
        63,
        53
      ],
      "accounts": [
        {
          "name": "pool"
        }
      ],
      "args": [],
      "returns": {
        "defined": {
          "name": "stakingStats"
        }
      }
    }
  ],
  "accounts": [
    {
      "name": "stakingPool",
      "discriminator": [
        203,
        19,
        214,
        220,
        220,
        154,
        24,
        102
      ]
    },
    {
      "name": "userStake",
      "discriminator": [
        102,
        53,
        163,
        107,
        9,
        138,
        87,
        153
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unstakeDelay",
      "msg": "Unstake delay not satisfied"
    },
    {
      "code": 6001,
      "name": "withdrawAlreadyStarted",
      "msg": "Withdraw already started"
    },
    {
      "code": 6002,
      "name": "withdrawNotStarted",
      "msg": "Withdraw not started"
    }
  ],
  "types": [
    {
      "name": "stakingPool",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "validator",
            "type": "pubkey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalShares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "stakingStats",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalStaked",
            "type": "u64"
          },
          {
            "name": "totalShares",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "userStake",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "pubkey"
          },
          {
            "name": "amountStaked",
            "type": "u64"
          },
          {
            "name": "shares",
            "type": "u64"
          },
          {
            "name": "withdrawRequestedAt",
            "type": {
              "option": "u64"
            }
          }
        ]
      }
    }
  ]
};
