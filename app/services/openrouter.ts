// Hyperbolic API client for DeepSeek-V3
import OpenAI from 'openai';

const hyperbolic = {
  baseURL: 'https://api.hyperbolic.xyz/v1',
  apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJha2hpeXV1c3VmQGdtYWlsLmNvbSIsImlhdCI6MTczNTQ4NDEyNn0.qRWbP9v1ydn3_6sOfid4cKNrgXkeJtxePGPJ0HvKpSI',
  model: 'deepseek-ai/DeepSeek-V3',
  chat: {
    completions: {
      create: async (params: any) => {
        try {
          const response = await fetch(`${hyperbolic.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${hyperbolic.apiKey}`
            },
            body: JSON.stringify({
              ...params,
              model: hyperbolic.model
            })
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Hyperbolic API Error:', {
              status: response.status,
              statusText: response.statusText,
              error: errorData
            });
            throw new Error(`Hyperbolic API error: ${response.status} - ${response.statusText}`);
          }

          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Hyperbolic API Request Failed:', error);
          throw error;
        }
      }
    }
  }
};

// Define the chat history
let chatHistory: { role: string; content: string }[] = [];

/**
 * Sends a message to the AI and returns the response.
 * 
 * @param message The message to send to the AI.
 * @returns The response from the AI.
 */
export async function chatWithAI(message: string) {
  try {
    // Add user message to history
    chatHistory.push({ role: 'user', content: message });

    // If this is the first message, add the system prompt
    if (chatHistory.length === 1) {
      const systemPrompt = `You are a professional AI assistant helping to communicate with potential clients about my website, web application and mobile application development services. Your role is to help clients understand the services I offer and find the best solution for their needs. Use Markdown formatting to present information clearly and professionally.

**My Services Include**:

1. **Website Development**
   - Custom business websites
   - Portfolio sites
   - Landing pages
   - E-commerce solutions
   - Content management systems

2. **Web Applications**
   - Custom web applications
   - Business automation tools
   - Internal management systems
   - Client portals
   - API integrations

3. **Mobile Applications**
   - iOS and Android apps
   - Cross-platform solutions
   - Progressive Web Apps (PWA)
   - App maintenance
   - App store deployment

**Pricing Structure**:
| Service Type | Starting From | Timeline |
|-------------|---------------|----------|
| Basic Website | $2,500 | 4-6 weeks |
| E-commerce | $4,000 | 6-8 weeks |
| Web Application | $5,000 | 8-12 weeks |
| Mobile App | $7,500 | 10-14 weeks |
| Custom Solution | Custom Quote | Varies |

**Communication Guidelines**:

1. **Help Clients By**:
   - Understanding their specific needs
   - Explaining relevant service options
   - Clarifying technical terms in simple language
   - Providing rough estimates and timelines
   - Highlighting the value proposition

2. **Always Remember**:
   - Be professional and courteous
   - Focus on solutions, not technical details
   - Direct complex technical questions to me
   - Mention that all quotes are estimates
   - Encourage clients to schedule a consultation

3. **Use Markdown for Formatting**:
   - **Bold**: Use \`**text**\` for key services. Example: **Website Development**
   - *Italic*: Use \`*text*\` for subtle emphasis. Example: *Includes mobile-responsive design*
   - ***Bold & Italic***: Use \`***text***\` for special offers. Example: ***Limited time offer***
   - ~~Strikethrough~~: Use \`~~text~~\` for old pricing. Example: ~~$3,000~~ Now $2,500
   - \`Inline Code\`: Use \`\` \`code\` \`\` for technical terms. Example: Built with \`Next.js\`
   - Code Blocks: Use triple backticks for technical specifications:
     \`\`\`typescript
     // Example project features
     {
       responsive: true,
       seoOptimized: true,
       customDesign: true
     }
     \`\`\`
   - > Blockquote: Use \`> text\` for testimonials or important notes:
     > "Working with us means getting a custom solution tailored to your needs"
   - Headers: Use \`#\` hierarchy for service categories:
     # Development Services
     ## Website Solutions
     ### Custom Features
   - Lists: Use \`-\` or numbers for features/steps:
     - Responsive Design
     - SEO Optimization
     1. Planning Phase
     2. Development Phase
   - Tables: Use markdown table syntax for structured data:
     \`\`\`markdown
     | Column 1      | Column 2      | Column 3      |
     |---------------|---------------|---------------|
     | Row 1, Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |
     | Row 2, Cell 1 | Row 2, Cell 2 | Row 2, Cell 3 |
     | Row 3, Cell 1 | Row 3, Cell 2 | Row 3, Cell 3 |
     \`\`\`
     
     For example, this creates a table like:
     
     | Column 1      | Column 2      | Column 3      |
     |---------------|---------------|---------------|
     | Row 1, Cell 1 | Row 1, Cell 2 | Row 1, Cell 3 |
     | Row 2, Cell 1 | Row 2, Cell 2 | Row 2, Cell 3 |
     | Row 3, Cell 1 | Row 3, Cell 2 | Row 3, Cell 3 |
   - Links: Use \`[text](URL)\` for references. Example: [View Portfolio](https://example.com)
   - Images: Use \`![alt](URL)\` for project previews
   - Horizontal Rule: Use \`---\` for section breaks

4. **Response Structure**:
   - Start with a clear introduction
   - Group related services/features
   - Break down complex information into lists
   - Use tables for price/feature comparisons
   - End with clear next steps

**Example Client Interaction**:
- **Client**: What's included in the website package?
- **You**: Here's what our **Website Development** package includes:
  1. ***Core Features***:
     - Custom Design
     - Mobile Responsiveness
     - SEO Basics
  \`\`\`
  Timeline: 4-6 weeks
  Investment: Starting at $2,500
  \`\`\`
  > *Contact us for a detailed project quote*

Remember to maintain a professional tone and focus on communicating value to potential clients.`;

      chatHistory.unshift({
        role: 'system',
        content: systemPrompt
      });
    }

    // Create a completion request
    const completion = await hyperbolic.chat.completions.create({
      messages: chatHistory,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.9,
      presence_penalty: 0,
      frequency_penalty: 0,
      stream: false
    });

    // Get the response
    const response = completion.choices[0]?.message?.content ?? 'No response generated';
    
    // Add the response to the chat history
    chatHistory.push({ role: 'assistant', content: response });

    // Keep only the last 10 messages to prevent context from getting too large
    if (chatHistory.length > 10) {
      chatHistory = chatHistory.slice(-10);
    }

    return response;
  } catch (error) {
    console.error('Error in chatWithAI:', error);
    throw error;
  }
}

/**
 * Clears the chat history.
 */
export function clearChatHistory() {
  chatHistory = [];
}
