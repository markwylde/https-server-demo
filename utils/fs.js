function readFileAsString (path) {
  return new Promise((resolve, reject) => {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
      root.getFile(path, {}, function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader()
          reader.onloadend = function (e) {
            resolve(this.result)
          }
          reader.readAsText(file)
        }, reject)
      }, reject)
    })
  })
}

function readFileAsBinary (path) {
  return new Promise((resolve, reject) => {
    chrome.runtime.getPackageDirectoryEntry(function(root) {
      root.getFile(path, {}, function(fileEntry) {
        fileEntry.file(function(file) {
          var reader = new FileReader()
          reader.onloadend = function (e) {
            resolve(this.result)
          }
          reader.readAsArrayBuffer(file)
        }, reject)
      }, reject)
    })
  })
}

