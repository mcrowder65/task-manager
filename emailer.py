import smtplib

fromaddr = 'driveway.matt.c@gmail.com'
toaddrs  = 'mcrowder65@gmail.com'
msg = 'dude i figured out how to email in python and it\'s super easy'


# Credentials (if needed)
username = 'driveway.matt.c@gmail.com'
password = 'mattcrowder123'

# The actual mail send
server = smtplib.SMTP('smtp.gmail.com:587')
server.starttls()
server.login(username,password)
server.sendmail(fromaddr, toaddrs, msg)
server.quit()