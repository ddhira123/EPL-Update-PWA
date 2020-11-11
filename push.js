const webPush = require('web-push');

const vapidKeys = {
	"publicKey":"BI0vM-PcNz9JaI5pxRDhppHKO7W6VEEEr_EcFEEQEcQkfzqCSZzezNXLBaB1YAYSKidWBrqQqLNG2Xsle-uTx5E",
	"privateKey":"TEHgGa31DXUNT-A5hko86BL-LIFdFlW3LvwRUEVNOxg"
};
 
 
webPush.setVapidDetails(
	'mailto:example@yourdomain.org',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)
const pushSubscription = {
	"endpoint": " https://fcm.googleapis.com/fcm/send/cGn_G0RIAoo:APA91bGECxuxRXNGw32z8zjJsgpQXH-_K0aFYQmAcuDXC_wujfos91PKod4Lx_qoweIlh1pcW5gqNeA1qr3-S9fMeN0EbJzR_0SkCnbmHnF7tkpRg7JUWw4fERRf-Y0sOPKsqrpILqt0",
	"keys": {
		"p256dh": "BI+YzP2HKX4UomOKGySvORsAlwJ+oKjWsQwN54bUtbk0rLZPshFcJLe0MLxQRCUMH7wbQcd7W/f7BvlvNso6nRs=",
		"auth": "p5F/xIGtlO0Z0NIo5+R8ow=="
	}
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
const options = {
	gcmAPIKey: "52589250839",
	TTL: 60
};
webPush.sendNotification(
	pushSubscription,
	payload,
	options
);