import { Observable } from 'tns-core-modules/data/observable';
import { SimpleLibsodium, AEDMethod, AEDValues, Base64Variant, Keybytes, Noncebytes } from 'nativescript-simple-libsodium';

export class HelloWorldModel extends Observable {

  public simpleLibsodium: SimpleLibsodium;

  constructor() {
    super();
    this.simpleLibsodium = new SimpleLibsodium();
  }

  /**
   * generateRandomData
   */
  public generateRandomData() {

    console.dir(this.simpleLibsodium.generateRandomData());

    console.dir(this.simpleLibsodium.generateKeyWithSuppliedString("Jibon Costa")); // Keep in mind that in order to produce the same key from the same password, the same algorithm, the same salt, and the same values for opslimit and memlimit have to be used. Therefore, these parameters have to be stored for each user.
  }

  /**
   * AEDEncrypt
   */
  public AEDEncrypt() {

    let key = this.simpleLibsodium.generateRandomData(AEDValues.XCHACHA20POLY1305_IETF_KEYBYTES);
    // or let key = this.simpleLibsodium.generateKeyWithSuppliedString("myKey", AEDValues.XCHACHA20POLY1305_IETF_KEYBYTES);

    let enc = this.simpleLibsodium.AEDEncrypt(AEDMethod.XCHACHA20_POLY1305_IETF, "Hello World", key.raw, '', "none");

    console.dir(enc);

    let dec = this.simpleLibsodium.AEDDecrypt(AEDMethod.XCHACHA20_POLY1305_IETF, enc.rawCrypted, key.raw, enc.rawNonce, "none");

    console.dir(dec);
  }

  /**
   * secretBox
   */
  public secretBox() {

    let key = this.simpleLibsodium.generateRandomData(Keybytes.SECRETBOX_KEYBYTES);
    // or let key = this.simpleLibsodium.generateKeyWithSuppliedString("myKey", Keybytes.SECRETBOX_KEYBYTES);

    let enc = this.simpleLibsodium.secretBoxEncrypt("Hello World", key.raw);

    console.dir(enc);

    let dec = this.simpleLibsodium.secretBoxOpen(enc.rawCrypted, key.raw, enc.rawNonce);

    console.dir(dec);
  }

  /**
   * xSalsa20Encrypt
   */
  public xSalsa20() {

    let key = this.simpleLibsodium.generateRandomData(Keybytes.STREAM_KEYBYTES);
    // or let key = this.simpleLibsodium.generateKeyWithSuppliedString("myKey", Keybytes.STREAM_KEYBYTES);

    let enc = this.simpleLibsodium.xSalsa20Encrypt("Hello World", key.raw);

    console.dir(enc);

    let dec = this.simpleLibsodium.xSalsa20Decrypt(enc.rawCrypted, key.raw, enc.rawNonce);

    console.dir(dec);
  }

  /**
   * boxEasy
   */
  public boxEasy() {

    let bob = this.simpleLibsodium.boxKeyPaired();
    let alice = this.simpleLibsodium.boxKeyPaired();

    // Bob sending message to Alice. So, here will need Alice's public key & Bob's private/secret key
    let enc = this.simpleLibsodium.boxEasy("Hello World", alice.public_key, bob.private_key);

    console.dir(enc);

    // Alice got the message from Bob. Now Alice need his private key & Bob's public key.
    let dec = this.simpleLibsodium.boxOpenEasy(enc.rawCrypted, enc.rawNonce, bob.public_key, alice.private_key);

    console.dir(dec);
  }

  /**
   * passwordHash
   */
  public passwordHash() {

    let enc = this.simpleLibsodium.passwordHash("MyPassword");

    console.dir(enc);

    if (this.simpleLibsodium.passwordHashVerify(enc.plainHash, "MyPassword")) {
      console.log("Password Matched!");
    } else {
      console.log("Password invalid!");
    }
  }

  /**
   * cryptoAuth
   */
  public cryptoAuth() {

    let enc = this.simpleLibsodium.cryptoAuth("Jibon Costa");

    console.dir(enc);

    if (this.simpleLibsodium.cryptoAuthVerify(enc.rawCrypted, "Jibon Costa", enc.rawKey)) {
      console.log("Matched !")
    } else {
      console.log("Didn't match")
    }
  }

  /**
   * sha2hash
   */
  public sha2hash() {
    let enc = this.simpleLibsodium.SHA2Hash("MyPassword", 512); // or 256
    console.dir(enc);
  }
}

