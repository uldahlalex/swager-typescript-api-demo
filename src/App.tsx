import {Activity, Api} from "../Api.ts";

export const MyApi = new Api({
    baseURL: 'https://fakerestapi.azurewebsites.net'
});

export default function App() {

    async function sendMyRequest() {
        const response = await MyApi.api
            .v1ActivitiesCreate({
                id: 1,
                dueDate: new Date().toISOString(),
                completed: true,
                title: 'hello world'
        });
        console.log(response.data);
    }

    return(<>
        <button onClick={() => sendMyRequest()}>Send my POST request</button>
    </>)
}