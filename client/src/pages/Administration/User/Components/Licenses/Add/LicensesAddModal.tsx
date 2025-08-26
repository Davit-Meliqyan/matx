import React, { useState, useEffect } from "react";
import { Steps, Button, Modal, message } from "antd";
import { BiImport } from "react-icons/bi";
import { Step1FormValues, Step1Data, Step2Data } from "./types";
import Step1Form from "./Step1Form";
import Step2Upload from "./Step2Upload";
import { useLicenseStore } from "../../../../../../store/useLicensesFetchStore";

const { Step } = Steps;

const LicensesAddModal: React.FC = () => {
  const createItem = useLicenseStore((state) => state.createItem);
  const uploadFile = useLicenseStore((state) => state.uploadFile);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [formStep1, setFormStep1] = useState<Step1Data | null>(null);
  const [createId, setCreateId] = useState<string>("");

  useEffect(() => {
    setCurrent(0);
    setFormStep1(null);
    setCreateId("");
  }, []);

  // Step 1 submit
  const handleStep1Finish = async (values: Step1FormValues) => {
    const formatted: Step1Data = {
      ...values,
      expiryReminder: values.expiryReminder,
      date: values.date?.toISOString() ?? "",
      dateOfExpiry: values.dateOfExpiry?.toISOString() ?? "",
    };

    const created = await createItem("members", formatted);
    setCreateId(created.id);

    setFormStep1(formatted);
    setCurrent(1);
  };

  // Step 2 submit
  const handleStep2Finish = async (values: Step2Data) => {
    try {
      if (values.fileURLs?.length) {
        await uploadFile(
          "members",
          createId,
          values.fileURLs.map((f) => f.originFileObj!)
        );
      }
      message.success("All files uploaded successfully!");
      setCurrent(steps.length);
    } catch {
      message.error("One or more files failed to upload");
    }
  };

  const steps = [
    {
      title: "Basic data",
      content: (
        <Step1Form initialValues={formStep1} onFinish={handleStep1Finish} />
      ),
    },
    {
      title: "Upload file",
      content: (
        <Step2Upload
          onFinish={handleStep2Finish}
          onSkip={() => {
            message.info("Step 2 skipped");
            setCurrent(steps.length);
          }}
        />
      ),
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-3 flex gap-2 items-center rounded-md text-[#B4B9C1] bg-[#F2F4F8] transition-all duration-300 ease-in-out delay-100 hover:text-[#253AA6] hover:bg-[#D6E0FF] hover:shadow-md"
      >
        <BiImport className="text-xl text-black" />
        Import
      </button>

      <Modal
        title="Add License"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <div style={{ maxWidth: 600, margin: "50px auto" }}>
          <Steps current={current} style={{ marginBottom: 24 }}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>

          <div>
            {current < steps.length ? (
              steps[current].content
            ) : (
              <div>
                <h3>All steps completed!</h3>
                <Button
                  type="primary"
                  onClick={() => {
                    setCurrent(0);
                    setFormStep1(null);
                  }}
                  style={{ marginTop: 16 }}
                >
                  Restart
                </Button>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LicensesAddModal;
