const { SQS, DeleteQueueCommand } = require('@aws-sdk/client-sqs');
const sqs = new SQS({
    credentials: {
        accessKeyId: 'AKIASXM4V7ZFQZJ2EB6X',
        secretAccessKey: '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'
    },
    region: 'us-east-1'
});

function deleteQueueV2WithCallBack(queueUrl) {
    sqs.deleteQueue({ QueueUrl: queueUrl }, function (err, data) {
        if (err) console.error('deleteQueueAsyncAwait : Error deleting queue:', err);
        else console.log(`deleteQueueCallBack : Queue deleted: ${queueUrl}`);
        }
    )
}

async function deleteQueueV2WithAsyncAwait(queueUrl) {
    try {
        await sqs.deleteQueue({ QueueUrl: queueUrl });
        console.log(`deleteQueueAsyncAwait : Queue deleted: ${queueUrl}`);
    } catch (err) {
        console.error('deleteQueueAsyncAwait : Error deleting queue:', err);
    }
}

// Method to delete a queue using v3 commands
function deleteQueueV3WithPromiseChain(queueUrl) {
    const command = new DeleteQueueCommand({ QueueUrl: queueUrl });

    sqs.send(command)
        .then(() => {
            console.log(`deleteQueueV3 : Queue deleted: ${queueUrl}`);
        })
        .catch((err) => {
            console.error('deleteQueueV3 : Error deleting queue:', err);
        });
}

async function deleteQueueV3WithAwaitAsync(queueUrl) {
    const command = new DeleteQueueCommand({ QueueUrl: queueUrl });

    try {
        await sqs.send(command)
        console.log(`deleteQueueV3 : Queue deleted: ${queueUrl}`);
    } catch(err) {
        console.error('deleteQueueV3 : Error deleting queue:', err);
    }
}

async function deleteQueueV3WithCallbacks(queueUrl) {
   const command = new DeleteQueueCommand({ QueueUrl: queueUrl });

   try {
        await sqs.send(command)
        console.log(`deleteQueueV3WithCallbacks : Queue deleted: ${queueUrl}`);
    } catch(err) {
        console.error('deleteQueueV3WithCallbacks : Error deleting queue:', err);
    }

}

// Example usage
let queueName = 'tr_undefined_undefined_00085faa-7f0c-42d6-9380-3aad1adaa9d0.fifo'
let queueUrl = 'https://sqs.us-east-1.amazonaws.com/187696545355/' + queueName;
deleteQueueV3WithCallbacks(queueUrl);