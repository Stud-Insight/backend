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
├── account - POST
│
│
│
│
│
└── api/
    └── ter/
        ├── :category - GET // Permet d'accéder à la liste des TERs pour chacune des catégories (INFO, BIO, ...)
        ├── create - POST // Ajout d'un TER 
        └── :id/ - GET, POST, DELETE // Récupération, suppression ou modification d'un TER pré-existant
