export default {

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
    }

}