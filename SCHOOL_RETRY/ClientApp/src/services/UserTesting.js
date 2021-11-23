import { Rest } from '../serviceManager/servicesProvider';


export default class UserTesting {
    fetchAll() {
        return Rest.get('/api/usertest');
    }

    fetch(questionId) {
        return Rest.post(`/api/usertest/${questionId}`);
    }

}