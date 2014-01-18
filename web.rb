require 'webrick'
require 'webrick/https'
require 'openssl'

cert = OpenSSL::X509::Certificate.new File.read 'key-cert.pem'
pkey = OpenSSL::PKey::RSA.new File.read 'key.pem'

server = WEBrick::HTTPServer.new(:Port => 443,
                                 :SSLEnable => true,
                                 :SSLCertificate => cert,
                                 :SSLPrivateKey => pkey,
                                 :DocumentRoot => Dir.pwd)

trap('INT') { server.shutdown }
server.start
