import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const API_KEY = 'AIzaSyDHzDFEqekYdN423BMRIYv6U2dbnbtEWrs';
const genAI = new GoogleGenerativeAI(API_KEY);

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ProjectCost {
  basePrice: number;
  totalCost: number;
  breakdown: {
    complexity: number;
    timeline: number;
    pages: number;
    revisions: number;
  };
}

// Project cost calculation helper
export function calculateProjectCost(
  projectType: 'website' | 'webApplication' | 'mobileApplication' | 'ecommerce',
  complexity: 'basic' | 'recommended' | 'premium',
  timeline: 'rush' | 'standard' | 'extended',
  pages: '1-5' | '6-10' | '11-20' | '20+',
  revisions: 'basic' | 'recommended' | 'premium'
): ProjectCost {
  const basePrices = {
    website: 2500,
    webApplication: 5000,
    mobileApplication: 7500,
    ecommerce: 4000
  };

  const multipliers = {
    complexity: {
      basic: 1.0,
      recommended: 1.5,
      premium: 2.0
    },
    timeline: {
      rush: 1.5,
      standard: 1.3,
      extended: 1.0
    },
    pages: {
      '1-5': 1.0,
      '6-10': 1.4,
      '11-20': 1.8,
      '20+': 2.2
    },
    revisions: {
      basic: 1.0,
      recommended: 1.5,
      premium: 2.0
    }
  };

  const basePrice = basePrices[projectType];
  const breakdown = {
    complexity: multipliers.complexity[complexity],
    timeline: multipliers.timeline[timeline],
    pages: multipliers.pages[pages],
    revisions: multipliers.revisions[revisions]
  };

  const totalCost = basePrice * 
    breakdown.complexity * 
    breakdown.timeline * 
    breakdown.pages * 
    breakdown.revisions;

  return {
    basePrice,
    totalCost,
    breakdown
  };
}

let chatInstance: any = null;

export async function chatWithGemini(message: string, history: ChatMessage[]) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-pro",
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 1000,
        topP: 0.8,
        topK: 40
      }
    });
    
    // Initialize chat instance if it doesn't exist
    if (!chatInstance) {
      chatInstance = model.startChat({
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.9,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_ONLY_HIGH"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_ONLY_HIGH"
          }
        ]
      });

      // Add initial system prompt
      await chatInstance.sendMessage(
        `You are a professional sales closer and AI assistant for a developer who is transitioning into real estate. Your primary role is to help clients find the perfect development solution within their budget.

        IMPORTANT RULES:
        1. NEVER invent or hallucinate prices or services
        2. ONLY use the exact prices and options from the project calculator
        3. NEVER mention any prices that aren't in the calculator
        4. When a client mentions their budget, ALWAYS use it to suggest specific calculator options

        Base Prices (These are the ONLY base prices you can mention):
        Website: $2,500
        Web Application: $5,000
        Mobile App: $7,500
        E-commerce: $4,000

        Available Multipliers:
        Complexity: Basic (1.0x) | Recommended (1.5x) | Premium (2.0x)
        Timeline: Extended (1.0x) | Standard (1.3x) | Rush (1.5x)
        Pages: 1-5 (1.0x) | 6-10 (1.4x) | 11-20 (1.8x) | 20+ (2.2x)
        Revisions: Basic (1.0x) | Recommended (1.5x) | Premium (2.0x)

        When presenting options to clients, ALWAYS use this EXACT format:

        ### Option 1: [Project Type]
        Base Price: $[amount]
        Complexity ([level]): [X.X]x
        Timeline ([option]): [X.X]x
        Pages ([range]): [X.X]x
        Revisions ([level]): [X.X]x
        ----------------------------------------
        Final Cost: $[total]

        Example:
        ### Option 1: Website
        Base Price: $2,500
        Complexity (Premium): 2.0x
        Timeline (Standard): 1.3x
        Pages (6-10): 1.4x
        Revisions (Basic): 1.0x
        ----------------------------------------
        Final Cost: $9,100

        Development Process:
        - Receive client brief
        - Design project
        - Build and test
        - Launch with client approval
        - Provide 6 weeks of post-launch support

        Remember:
        - Always maintain conversation context
        - Be professional but friendly
        - Focus on understanding client needs
        - Only use calculator prices and multipliers
        - Never invent or hallucinate features or prices
        - Always use the exact format shown above for calculations`
      );
    }

    // Add history to the chat
    for (const msg of history) {
      if (msg.role === 'user') {
        await chatInstance.sendMessage(msg.content);
      }
    }

    // Send the new message
    const result = await chatInstance.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Error in Gemini chat:', error);
    
    // Reset chat instance on error
    chatInstance = null;
    
    // Handle specific error types
    if (error.message?.includes('SAFETY')) {
      return "I apologize, but I need to keep our conversation appropriate and safe. How else can I help you?";
    } else if (error.message?.includes('blocked')) {
      return "I apologize, but I can't respond to that type of request. Let's talk about something else!";
    }
    
    return 'Sorry, I encountered an error. Please try again with a different question.';
  }
}
