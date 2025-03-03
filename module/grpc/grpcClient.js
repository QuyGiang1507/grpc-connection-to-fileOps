const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Danh sách các file proto
const PROTO_FILES = {
  pdfGenerator: "./proto/pdfGenerator.proto",
  signService: "./proto/signService.proto",
};

// Hàm load gRPC client
function loadGrpcClient(protoPath, serviceName) {
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const grpcPackage = grpc.loadPackageDefinition(packageDefinition);
  return new grpcPackage[serviceName][serviceName](
    "localhost:5001",
    grpc.credentials.createInsecure()
  );
}

// Khởi tạo các clients gRPC
const grpcClients = {
  pdfGenerator: loadGrpcClient(PROTO_FILES.pdfGenerator, "PdfGenerator"),
  signService: loadGrpcClient(PROTO_FILES.signService, "SignService"),
};

// Export để sử dụng trong các module khác
module.exports = grpcClients;
