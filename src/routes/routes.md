.
├── auth/
│   ├── login - POST
│   ├── logout - POST
│   ├── refresh - POST 🔒
│   └── activate/:token - GET
└── attachments/
    ├── :userId/:fileId - GET, DELETE 🔒
    ├── upload - POST 🔒
    └── profilePicture - POST, DELETE 🔒