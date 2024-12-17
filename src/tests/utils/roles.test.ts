import Role from "@/models/Role";
import User from "@/models/User";
import { getRolesFromUserId } from "@/utils/roles";

describe("Tests des fonctions de utils/roles.ts", () => {

    let userId: string;
    let idRoleA: string;
    let idRoleB: string;

    beforeAll(async () => {

        const roleA = new Role({ name: "roleA", permissions: ["perm1", "perm2"] });
        const roleB = new Role({ name: "roleB", permissions: ["perm2", "perm3"] });
        
        idRoleA = (await roleA.save()).id;
        idRoleB = (await roleB.save()).id;

        const user = new User({
            firstName: "...",
            email: "test@example.com",
            roles: [idRoleA, idRoleB]
        });

        userId = (await user.save()).id;

    });



    test("Récupération des rôles d'un utilisateur", async () => {

        const roles = await getRolesFromUserId(userId);
        
        expect(roles.map(role => role.id)).toStrictEqual([idRoleA, idRoleB]);

    });


});