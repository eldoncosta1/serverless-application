aws s3api create-bucket --bucket ec20-hello-bucket

aws s3 cp test.txt s3://ec20-hello-bucket
aws s3 cp s3://ec20-hello-bucket/test.txt h.txt

aws s3 rm s3://ec20-hello-bucket --recursive
aws s3api delete-bucket --bucket ec20-hello-bucket