using Microsoft.Extensions.Configuration;
using Milo.Subscription.Application.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Milo.Subscription.Infrastructure.Security
{
    public class EncryptionService : IEncryptionService
    {
        private readonly byte[] _secretKey;
        private readonly byte[] _initVector;

        public EncryptionService(IConfiguration configuration)
        {
            _secretKey = Encoding.UTF8.GetBytes(configuration["EncryptionSettings:Key"]!);
            _initVector = Encoding.UTF8.GetBytes(configuration["EncryptionSettings:IV"]!);
        }

        public string Decrypt(string password)
        {
            using var aes = Aes.Create();
            aes.Key = _secretKey;
            aes.IV = _initVector;

            var decryptor = aes.CreateDecryptor();
            var bytes = Convert.FromBase64String(password);
            var result = decryptor.TransformFinalBlock(bytes, 0, bytes.Length);

            return Encoding.UTF8.GetString(result);
        }

        public string Encrypt(string password)
        {
            using var aes = Aes.Create();
            aes.Key = _secretKey;
            aes.IV = _initVector;

            var encryptor = aes.CreateEncryptor();
            var bytes = Encoding.UTF8.GetBytes(password);
            var result = encryptor.TransformFinalBlock(bytes, 0, bytes.Length);

            return Convert.ToBase64String(result);
        }
    }
}
