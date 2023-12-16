import os
import shutil
import json
import sqlite3
def clear_data(clearpic=True, clearsqlite=True):

    if clearsqlite:
        conn = sqlite3.connect('db.sqlite3')
        c = conn.cursor()
        c.execute("DELETE FROM account")
        c.execute("DELETE FROM datasets")
        c.execute("DELETE FROM dataset")
        conn.commit()
        conn.close()
    # folder = 'static/data/datasets'
    # for filename in os.listdir(folder):
    #     file_path = os.path.join(folder, filename)
    #     try:
    #         if os.path.isfile(file_path) or os.path.islink(file_path):
    #             os.unlink(file_path)
    #         elif os.path.isdir(file_path):
    #             shutil.rmtree(file_path)
    #     except Exception as e:
    #         print('Failed to delete %s. Reason: %s' % (file_path, e))
    if clearpic:
        folder = 'static/data/pictures'
        for filename in os.listdir(folder):
            file_path = os.path.join(folder, filename)
            try:
                if os.path.isfile(file_path) or os.path.islink(file_path):
                    os.unlink(file_path)
                elif os.path.isdir(file_path):
                    shutil.rmtree(file_path)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (file_path, e))

    # with open('static/data/accounts.json', 'w') as f:
    #     json.dump({}, f)


if __name__ == "__main__":
    clear_data()
