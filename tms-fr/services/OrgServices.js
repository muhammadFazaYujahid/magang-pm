import getConfig from "next/config";
import Router from "next/router";
// import { useRouter } from 'next/router';

export class OrgServices {
    constructor() {
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
        this.serverURL = 'http://localhost:9000';
        this.org_key = sessionStorage.getItem('org_key');
        // this.router = useRouter();
    }

    async nonTeamMember() {
        return await fetch(this.serverURL + '/api/organization/nonteam-member?org_key=' + this.org_key, {
            method: 'GET', credentials: 'include', headers: {
                'Control-Allow-Credentials': 'true'
            }
        })
            .then((res) => res.json())
            .then((d) => d.data);
    }


    async searchMember(email) {
        return await fetch(this.serverURL + '/api/organization/search-member?email=' + email + '&org_key=' + this.org_key, {
            method: 'GET', credentials: 'include', headers: {
                'Control-Allow-Credentials': 'true'
            }
        })
            .then((res) => res.json())
            .then(async (d) => {
                const userData = d.data;
                const allUser = [];
                Promise.all(
                    userData.map((user) => {
                        if (user.user_has_orgs[0] !== undefined && user.user_has_orgs[0].org_key == this.org_key) {
                            user.sameOrg = true;
                        } else {
                            user.sameOrg = false;
                        }
                        allUser.push(user);
                    })
                )
                return allUser;
            });
    }

    async getUserList(email) {
        return await fetch(this.serverURL + '/api/organization/users/user-list?email=' + email + '&org_key=' + this.org_key, {
            method: 'GET', credentials: 'include', headers: {
                'Control-Allow-Credentials': 'true'
            }
        })
            .then((res) => res.json())
            .then((d) => d.data);
    }

    async createClient(formData) {
        const response = await fetch(this.serverURL + '/api/organization/client', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        return data;
    }

    async getClient(org_key) {
        const response = await fetch(this.serverURL + '/api/organization/get-client?org_key=' + org_key, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Control-Allow-Credentials': 'true'
            }
        });
        const data = await response.json();
        return data.data;
    }

    async updateClient(formData) {
        const response = await fetch(this.serverURL + '/api/organization/client/edit', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        return data;
    }

    async deleteClient(formData) {
        const response = await fetch(this.serverURL + '/api/organization/client/' + formData.client_key, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Control-Allow-Credentials': 'true'
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        return data;
    }
}