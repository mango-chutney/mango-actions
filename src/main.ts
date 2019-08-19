import * as core from '@actions/core';
import * as exec from '@actions/exec';

// TODO: Support mutiple operating systems

async function run() {
  try {
    // Inputs
    const gcloud_channel = core.getInput('gcloud_channel');

    // Start Installing
    core.debug(`Installing GCloud snap channel ${gcloud_channel}`);

    // Install Gcloud Snap
    await exec.exec(
      `sudo snap install google-cloud-sdk --channel=${gcloud_channel} --classic`,
    );

    // Ensure root is owned
    await exec.exec('sudo chown root:root /');

    // Initialize Gcloud
    await exec.exec(
      'gcloud auth activate-service-account --key-file=gcloud.json',
    );
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
