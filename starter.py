import subprocess
subprocess.Popen(["php","artisan","serve"],shell=True,cwd="./backend")
subprocess.Popen(["ember","serve"],shell=True,cwd="./frontend")
