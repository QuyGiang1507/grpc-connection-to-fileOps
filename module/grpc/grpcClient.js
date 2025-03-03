import path from "path";
import { fileURLToPath } from "url";
import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";

// Tạo __dirname theo cách thủ công
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Danh sách các file proto (Dùng đường dẫn tuyệt đối)
const PDF_PROTO_PATH = path.resolve(
  __dirname,
  "../../protos/pdfGenerator.proto"
);
const SIGN_PROTO_PATH = path.resolve(__dirname, "../../protos/signFile.proto");

// Hàm load gRPC client
const pdfPackageDef = protoLoader.loadSync(PDF_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const signPackageDef = protoLoader.loadSync(SIGN_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load các gRPC services từ proto
const pdfGrpcPackage = grpc.loadPackageDefinition(pdfPackageDef);
const signGrpcPackage = grpc.loadPackageDefinition(signPackageDef);

if (!pdfGrpcPackage.PdfGenerator || !pdfGrpcPackage.PdfGenerator.PdfGenerator) {
  throw new Error("Không tìm thấy PdfGenerator service trong gRPC package!");
}
const PdfGeneratorClient = pdfGrpcPackage.PdfGenerator.PdfGenerator;

if (!signGrpcPackage.SignFile || !signGrpcPackage.SignFile.SignFile) {
  throw new Error("Không tìm thấy SignFile service trong gRPC package!");
}
const SignFileClient = signGrpcPackage.SignFile.SignFile;

// Hàm khởi tạo các gRPC client
function createGrpcClients() {
  return {
    pdfGenerator: new PdfGeneratorClient(
      "localhost:5001",
      grpc.credentials.createInsecure()
    ),
    signFile: new SignFileClient(
      "localhost:5001",
      grpc.credentials.createInsecure()
    ),
  };
}

export const grpcClients = createGrpcClients();
