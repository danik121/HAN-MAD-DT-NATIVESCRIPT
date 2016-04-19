var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var observable = require("data/observable");
var imagesource = require("image-source");
var application = require("application");
var Intent = android.content.Intent;
var Activity = android.app.Activity;
var MediaStore = android.provider.MediaStore;
var BitmapFactory = android.graphics.BitmapFactory;
var SelectedAsset = (function (_super) {
    __extends(SelectedAsset, _super);
    function SelectedAsset(uri) {
        _super.call(this);
        this._uri = uri;
        this._thumbRequested = false;
    }
    SelectedAsset.prototype.data = function () {
        return Promise.reject(new Error("Not implemented."));
    };
    Object.defineProperty(SelectedAsset.prototype, "thumb", {
        get: function () {
            if (!this._thumbRequested) {
                this.decodeThumbUri();
            }
            return this._thumb;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedAsset.prototype, "uri", {
        get: function () {
            return this._uri.toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectedAsset.prototype, "fileUri", {
        get: function () {
            if (!this._fileUri) {
                this._fileUri = this._calculateFileUri();
            }
            return this._fileUri;
        },
        enumerable: true,
        configurable: true
    });
    SelectedAsset.prototype._calculateFileUri = function () {
        var cursor;
        var columns = [MediaStore.MediaColumns.DATA];
        if (android.os.Build.VERSION.SDK_INT >= 19) {
            var wholeID = android.provider.DocumentsContract.getDocumentId(this._uri);
            var id = wholeID.split(":")[1];
            cursor = this.getContentResolver().query(android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI, columns, "_id=?", [id], null);
        }
        else {
            cursor = this.getContentResolver().query(this._uri, columns, null, null, null);
        }
        var filePath;
        try {
            cursor.moveToFirst();
            var columnIndex = cursor.getColumnIndexOrThrow(columns[0]);
            filePath = cursor.getString(columnIndex);
            if (filePath) {
                return filePath;
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            if (cursor) {
                cursor.close();
            }
        }
        try {
            filePath = this._uri.getPath();
            if (filePath) {
                return filePath;
            }
        }
        catch (e) {
            console.log(e);
        }
        return undefined;
    };
    SelectedAsset.prototype.decodeThumbUri = function () {
        var boundsOptions = new BitmapFactory.Options();
        boundsOptions.inJustDecodeBounds = true;
        BitmapFactory.decodeStream(this.getContentResolver().openInputStream(this._uri), null, boundsOptions);
        var REQUIRED_SIZE = 100;
        var outWidth = boundsOptions.outWidth;
        var outHeight = boundsOptions.outHeight;
        var scale = 1;
        while (true) {
            if (outWidth / 2 < REQUIRED_SIZE
                || outHeight / 2 < REQUIRED_SIZE) {
                break;
            }
            outWidth /= 2;
            outHeight /= 2;
            scale *= 2;
        }
        var downsampleOptions = new BitmapFactory.Options();
        downsampleOptions.inSampleSize = scale;
        var bitmap = BitmapFactory.decodeStream(this.getContentResolver().openInputStream(this._uri), null, downsampleOptions);
        this._thumb = new imagesource.ImageSource();
        this._thumb.setNativeSource(bitmap);
        this.notifyPropertyChange("thumb", this._thumb);
    };
    SelectedAsset.prototype.getContentResolver = function () {
        return application.android.nativeApp.getContentResolver();
    };
    return SelectedAsset;
})(observable.Observable);
exports.SelectedAsset = SelectedAsset;
var ImagePicker = (function () {
    function ImagePicker(options) {
        this._options = options;
    }
    Object.defineProperty(ImagePicker.prototype, "mode", {
        get: function () {
            return this._options && this._options.mode && this._options.mode.toLowerCase() === 'single' ? 'single' : 'multiple';
        },
        enumerable: true,
        configurable: true
    });
    ImagePicker.prototype.authorize = function () {
        return Promise.resolve();
    };
    ImagePicker.prototype.present = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var RESULT_CODE_PICKER_IMAGES = 9192;
            var application = require("application");
            application.android.on(application.AndroidApplication.activityResultEvent, onResult);
            function onResult(args) {
                var requestCode = args.requestCode;
                var resultCode = args.resultCode;
                var data = args.intent;
                if (requestCode == RESULT_CODE_PICKER_IMAGES) {
                    if (resultCode == Activity.RESULT_OK) {
                        try {
                            var results = [];
                            var clip = data.getClipData();
                            if (clip) {
                                var count = clip.getItemCount();
                                for (var i = 0; i < count; i++) {
                                    var clipItem = clip.getItemAt(i);
                                    if (clipItem) {
                                        var uri = clipItem.getUri();
                                        if (uri) {
                                            results.push(new SelectedAsset(uri));
                                        }
                                    }
                                }
                            }
                            else {
                                var uri = data.getData();
                                results.push(new SelectedAsset(uri));
                            }
                            application.android.off(application.AndroidApplication.activityResultEvent, onResult);
                            resolve(results);
                            return;
                        }
                        catch (e) {
                            application.android.off(application.AndroidApplication.activityResultEvent, onResult);
                            reject(e);
                            return;
                        }
                    }
                    else {
                        application.android.off(application.AndroidApplication.activityResultEvent, onResult);
                        reject(new Error("Image picker activity result code " + resultCode));
                        return;
                    }
                }
            }
            ;
            var intent = new Intent();
            intent.setType("image/*");
            if (_this.mode === 'multiple') {
                intent.putExtra("android.intent.extra.ALLOW_MULTIPLE", true);
            }
            intent.setAction(Intent.ACTION_GET_CONTENT);
            var chooser = Intent.createChooser(intent, "Select Picture");
            application.android.foregroundActivity.startActivityForResult(intent, RESULT_CODE_PICKER_IMAGES);
        });
    };
    return ImagePicker;
})();
exports.ImagePicker = ImagePicker;
function create(options) {
    return new ImagePicker(options);
}
exports.create = create;
