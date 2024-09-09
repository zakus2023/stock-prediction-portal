import os
from django.conf import settings
import matplotlib.pyplot as plt

def save_plot(image_name):
    img_path=os.path.join(settings.MEDIA_ROOT, image_name)
    plt.savefig(img_path)
    plt.close()
    plot_img_url = settings.MEDIA_URL + image_name
    return plot_img_url