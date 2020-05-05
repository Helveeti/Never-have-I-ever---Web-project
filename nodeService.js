export default {

    // ----------------------------------------- HAASTEET

    async getHaasteet() {
        try {
            const response = await fetch('http://localhost:8081/neverever');
            const data = await response.json()
            this.haasteet = data;
            return await this.haasteet;
        } catch (error) {
            console.error(error)
        }
    },

    async getTiettyHaaste(haaste){
        try {
            const response = await fetch('http://localhost:8081/neverever/prompt', {
                method: 'POST',
                body: JSON.stringify(haaste),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            });
            const data = await response.json()
            this.haasteet = data;
            return await this.haasteet;
        } catch (error) {
            console.error(error)
        }
    },

    async addHaasteet(haaste) {
        try {
            const response = await fetch('http://localhost:8081/neverever/add', {
                method: 'POST',
                body: JSON.stringify(haaste),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
            const data = await response.json()
            this.haasteet = [...this.haasteet, data]
        } catch (error) {
            console.error(error)
        }
    },

    async editHaasteet(id, updatedHaaste) {
        try {
            const response = await fetch('http://localhost:8081/neverever', {
                method: 'PUT',
                body: JSON.stringify(updatedHaaste),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
            const data = await response.json()
            this.haasteet = this.haasteet.map(haaste => (haaste.id === id ? data : haaste))
            return this.haasteet
        } catch (error) {
            console.error(error)
        }
    },

    async deleteHaasteet(id) {
        try {
            const response = await fetch(`http://localhost:8081/neverever/${id}`, {
                method: 'DELETE'
            });
            console.log(response);
            this.haasteet = this.haasteet.filter(haaste => haaste.id !== id);
            return this.haasteet
        } catch (error) {
            console.error(error);
        }
    },

    // ----------------------------------------- USERS

    async getUsers() {
        try {
            const response = await fetch('http://localhost:8081/users');
            const data = await response.json()
            this.users = data;
            return await this.users;
        } catch (error) {
            console.error(error)
        }
    },

    async getTiettyUser(user){
        try {
            sessionStorage.setItem('username', user.user_name);

            const response = await fetch('http://localhost:8081/users/this', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            });
            const data = await response.json()
            this.users = data;
            return this.users;
        } catch (error) {
            console.error(error)
        }
    },

    async getTiettyUserInfo(user){
        try {
            const response = await fetch('http://localhost:8081/users/info', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            });
            const data = await response.json()
            this.users = data;
            return this.users;
        } catch (error) {
            console.error(error)
        }
    },

    async updatePassword(id, updatedPassword) {
        try {
            var haku = JSON.parse('{"user_id": ' + id +', "new_password": "' + updatedPassword + '"}');

            const response = await fetch('http://localhost:8081/users/update', {
                method: 'PUT',
                body: JSON.stringify(haku),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
            console.log(response);
            return response;
        } catch (error) {
            console.error(error)
        }
    },

    async editUsername(id, updatedUsername) {
        try {
            var haku = JSON.parse('{"user_id": ' + id + ', "user_name": "' + updatedUsername + '"}');

            const response = await fetch('http://localhost:8081/users/username/update', {
                method: 'PUT',
                body: JSON.stringify(haku),
                headers: {'Content-type': 'application/json; charset=UTF-8'},
            })
            const data = await response.json()
            this.users = this.users.map(user => (user.id === id ? data : user))
            return this.users
        } catch (error) {
            console.error(error)
        }
    },

    // ----------------------------------------- SESSION

    async getStorageInfo(){
        let data = sessionStorage.getItem('username');
        var user = JSON.parse('{ "user_name": "' + data + '"}');

        return await this.getTiettyUserInfo(user);
    },

}