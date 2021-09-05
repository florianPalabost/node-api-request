import {Request, Response} from "express";
const axios = require('axios');


const retrieveElements = async (req: Request, res: Response) => {
    try
    {
        // get parameters from request
        const url = req?.body?.url ?? 'http://192.168.10.62:4714/bim/';
        const method = req?.body?.method ?? 'GET';
        const rgoc = req?.body?.rgoc ?? '';
        const rmodel = req?.body?.rmodel ?? '';

        if (url && method)
        {
            // get user information to be able to call nancy

            // 1st call to retrieve count elements

            const urlTotal = `http://192.168.10.62:4714/bim/${rgoc}.${rmodel}`;
            console.log(`[${rgoc}] [${rmodel}] : url : ${urlTotal}`);

            const totalElements = await axios.get(urlTotal + '/statistics');
            console.log(`[${rgoc}] [${rmodel}] : total elements : ${totalElements}`);
            // prepare all promises to retrieves parameters

            const LIMIT_ELEMENTS_SIZE = 1000;
            const promisesElements = [];
            const urlElement = `http://192.168.10.62:4714/bim/${rgoc}.${rmodel}/`;
            let start = 0;
            let elements = null;
            let testElements = [];
            for(let i = 0; i < totalElements; i + 1000)
            {
                // get elements
                elements = await axios.post(urlElement + `elements?start=${i}&count=${LIMIT_ELEMENTS_SIZE}`);
                console.log(`call : ${urlElement}elements?start=${i}&count=${LIMIT_ELEMENTS_SIZE}`);
                console.log('elemens length' , elements);

                testElements.push(elements);

                // get elements uuids
                let elementsUuid = elements.map(elt => elt.uuid);

                const promisesElements = [];

                promisesElements.push(axios.post(urlElement + 'parameters', elementsUuid));


            }
            // call api endpoint with parameters => move in service
            const responseParameters = await Promise.all(promisesElements);
            console.log('response params : ', responseParameters);

        }
    }
    catch (e)
    {
        console.log('[controller] : ', e.message);
        return e;
    }
}



const bench = async (req: Request, res: Response) => {
    const t0 = new Date();
    const urlToBench = '';

    // TODO get memory usage



    const t = new Date();
    const timeRequest = (t - t0);
    console.log('time request : ', timeRequest);

    const stats = {
        timeRequest
    }

    return stats;
}

module.exports = {
    retrieveElements,
    bench
}