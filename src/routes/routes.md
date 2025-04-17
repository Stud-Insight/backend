.
├── auth/
│   ├── login - POST
│   ├── logout - POST
│   ├── refresh - POST
│   ├── activate/
│   │   ├── :token - POST
│   │   └── check/
│   │       └── :token - POST
│   ├── forgot - POST
│   └── reset/
│       └── :token - POST
├── attachments/
│   ├── upload - POST
│   ├── avatar - POST
│   └── :fileId - GET, DELETE
└── account - POST