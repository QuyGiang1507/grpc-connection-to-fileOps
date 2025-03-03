import { grpcClients } from "../grpc/grpcClient.js";

export async function ConvertWordToPdfBuffer(buffers) {
  return new Promise((resolve, reject) => {
    grpcClients.pdfGenerator.ConvertWordToPdfBuffer(
      { buffers },
      (err, response) => {
        if (err) {
          return reject(new Error(err.message));
        }
        resolve(response.buffers);
      }
    );
  });
}

export async function ReplaceTextAndConvertToPdfBuffer(buffers, data) {
  return new Promise((resolve, reject) => {
    grpcClients.pdfGenerator.ReplaceTextAndConvertToPdfBuffer(
      { buffers, data: JSON.stringify(data) },
      (err, response) => {
        if (err) {
          return reject(new Error(err.message));
        }
        resolve(response.buffers);
      }
    );
  });
}
