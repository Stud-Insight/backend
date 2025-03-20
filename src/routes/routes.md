.
├── auth/
│   ├── login - POST
│   ├── logout - POST
│   ├── refresh - POST 🔒
│   └── activate/:token - GET
└── attachments/
    ├── :userId/:fileId - GET, DELETE 🔒
    ├── upload - POST 🔒
    └── avatar - POST, DELETE 🔒